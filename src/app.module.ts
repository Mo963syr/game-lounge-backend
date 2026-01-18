import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScreensModule } from './screens/screens.module';
import { TablesModule } from './tables/tables.module';
import { StoresModule } from './stores/stores.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
    }),

    // الاتصال بقاعدة البيانات
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb+srv://menuapp:qr7aXaG8rfSA1ERo@menuapp.mggtsul.mongodb.net/menuapp?retryWrites=true&w=majority&appName=menuapp',

    ),
    UsersModule,
    AuthModule,
    ScreensModule,
    TablesModule,
    StoresModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
