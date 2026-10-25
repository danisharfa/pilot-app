import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    example: ['from must be a valid ISO 8601 date string'],
  })
  message: string | string[];

  @ApiProperty({ example: '/flight-hours?from=abc' })
  path: string;

  @ApiProperty({ example: '2026-05-15T00:00:00.000Z' })
  timestamp: string;
}
