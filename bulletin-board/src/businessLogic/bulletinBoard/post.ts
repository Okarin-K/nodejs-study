export class PostInfo {
    public constructor(
        public readonly id: number | undefined,
        public readonly content: string,
        public readonly postedBy: string,
        public readonly trackingCookie: string,
        public readonly createdAt: Date
    ) {}
}