import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { RoleType } from 'src/user/entities/user.entity';

export const FORBIDDEN_RESOURCE = 'Not authorized';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const isAlowed = requiredRoles.some((role) => user.role === role);
    if (isAlowed) {
      return isAlowed;
    }

    throw new UnauthorizedException(FORBIDDEN_RESOURCE);
  }
}
