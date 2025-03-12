import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { UsersService } from "src/users/users.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UsersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not provided');
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const decoded = jwt.verify(token, this.configService.get('JWT_ACCESS_TOKEN'));
            
            const user = await this.userService.findOneByEmail(decoded.createLoginDto.email);
            
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
