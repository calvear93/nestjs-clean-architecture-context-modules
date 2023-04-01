import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform {
	transform(value: unknown): number | undefined {
		if (typeof value === 'string') {
			const parsed = +value;

			if (!Number.isNaN(parsed)) return parsed;
		}

		return undefined;
	}
}
