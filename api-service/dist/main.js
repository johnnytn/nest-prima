"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_prisma_1 = require("nestjs-prisma");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.NODE_ENV !== 'production') {
        const options = new swagger_1.DocumentBuilder()
            .setTitle('API')
            .setDescription('The API documentation')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        const swaggerPath = '/docs';
        swagger_1.SwaggerModule.setup(swaggerPath, app, document);
        const { httpAdapter } = app.get(core_1.HttpAdapterHost);
        app.useGlobalFilters(new nestjs_prisma_1.PrismaClientExceptionFilter(httpAdapter));
    }
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map