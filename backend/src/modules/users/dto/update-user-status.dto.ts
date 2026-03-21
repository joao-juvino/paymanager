import { IsBoolean, IsDefined } from 'class-validator';

export class UpdateUserStatusDto {
  @IsBoolean()
  @IsDefined() 
  isActive: boolean;
}