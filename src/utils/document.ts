import { convert } from 'html-to-text';
export default {
    readText: async (url: string): Promise<string> => {
        const text = await fetch(url).then(res => res.text());
        return convert(text)
    },
    splitText: (text: string, chunkSize: number, overlapSize: number): string[] => {
        const chunks: string[] = [];
        let start: number = 0;

        while (start < text.length) {
            const end = start + chunkSize
            const chunk = text.slice(start, end);
            chunks.push(chunk);
            start += chunkSize - overlapSize;
        }

        return chunks;
    },
}