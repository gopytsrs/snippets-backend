import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty({
    description: 'The title of the snippet',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the snippet, preserves line breaks',
  })
  @IsNotEmpty()
  content: string;
}
