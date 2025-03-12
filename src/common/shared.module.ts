import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config/config.service";
import { UsersModule } from "src/users/users.module";
import { AuthGuard } from "./guards/authGuard";
import { AuthModule } from "src/auth/auth.module";

@Global()
@Module({
    imports: [UsersModule,AuthModule],
    providers: [ConfigService,AuthGuard],
    exports: [ConfigService,AuthGuard]
})
export class SharedModule{}