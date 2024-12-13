import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DetailsModule } from './details/details.module';
config()
@Module({
  imports: [
    ContactsModule, DetailsModule,      
    TypeOrmModule.forRoot({
      type: 'postgres', // Change this from 'sqlite' to 'postgres'
      host: process.env.DB_HOST || 'localhost', // Host of your PostgreSQL database (default: localhost)
      port: parseInt(process.env.DB_PORT,)|| 5432, // Default port for PostgreSQL is 5432
      username: process.env.DB_USERNAME , // Your PostgreSQL username
      password: process.env.DB_PASSWORD , // Your PostgreSQL password
      database: process.env.DB_NAME , // The database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // The path to your entities
      synchronize: true, // Set to false in production to avoid auto-sync
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
