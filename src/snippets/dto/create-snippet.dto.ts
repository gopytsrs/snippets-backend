import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty({
    description: 'The title of the snippet',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the snippet, preserves line breaks',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
