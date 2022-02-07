export default class {
    constructor(params) {
        this.postId = params.id;
        this.setTitle("Viewing Post");
    }

    async getHtml() {
        return `
            <h1>Post</h1>
            <p>You are viewing post #${this.postId}.</p>
        `;
    }
}