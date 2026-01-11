// src/common/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// define the metadata key locally to avoid a missing import file
const ROLES_KEY = 'roles';
// use a local alias for the role type instead of importing a non-exported symbol
type UserRole = string;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // نقرأ الرول المطلوبة من الـ @Roles(...)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // لو ما في @Roles على الراوت → نسمح بالوصول
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // لو مافي يوزر داخل (ما في JWT) → ممنوع
    if (!user || !user.role) {
      return false;
    }

    // يسمح فقط إذا role ضمن الرول المطلوبة
    return requiredRoles.includes(user.role);
  }
}
