import { IsEmail, IsString, Length, MinLength, Matches, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @IsString()
  @Length(6, 6)
  @ApiProperty({
    description: '6-digit verification code sent to email',
    example: '123456',
  })
  code: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'New password (minimum 6 characters)',
    example: 'NewPassword123',
  })
  password: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @ApiProperty({
    description: 'Password confirmation (must match password and contain uppercase, lowercase, and number)',
    example: 'NewPassword123',
  })
  confirmPassword: string;

  @IsString()
  @IsUUID()
  @ApiProperty({
    description: 'store id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  storeId: string;
}
