import { Type } from 'class-transformer';
import { IsOptional, IsString, Min, IsInt } from 'class-validator';

export class UsersQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 4;
}