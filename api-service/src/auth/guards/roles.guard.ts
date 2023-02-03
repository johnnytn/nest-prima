import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { FORBIDDEN_RESOURCE } from 'src/commons/constants/jwt.constants';
import { RoleType } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get roles from endpoint using @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // Check if user has the role
    const isAlowed = requiredRoles.some((role) => user.role === role);
    if (isAlowed) {
      return isAlowed;
    }

    throw new UnauthorizedException(FORBIDDEN_RESOURCE);
  }
}
