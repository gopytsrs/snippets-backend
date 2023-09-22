import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetSnippetsQueryParamsDto {
  @ApiPropertyOptional({ description: 'The key to order the snippets by' })
  orderKey: 'views' | 'date';

  @ApiPropertyOptional({ description: 'The sort order' })
  sortOrder: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'The page to fetch' })
  @IsInt()
  cursorId: number = 1;
}
