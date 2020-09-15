class PostDetailsView {
    postsModel = new PostsModel();

    constructor() {
        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);

        // attach event listener (submit event pentru adaugat comentarii)
    }

    getPostId() {
        const params = new URLSearchParams(location.search);
        return params.get('id');
    }

    hidrateHtml(data) {
        data.then(post => {
            this.hidrateAuthor(post);

            const titleElem = document.querySelector('[data-post="title"]');
            const bodyElem = document.querySelector('[data-post="body"]');

            titleElem.innerText = post.title;
            bodyElem.innerHTML = post.body;
        })
    }

    hidrateAuthor() {
        // http://jsonplaceholder.typicode.com/users/1
        // this.usersModel.getUserById(post.userId).then(user => {

        // })
    }

    hidrateComments() {
        // http://jsonplaceholder.typicode.com/posts/2/comments
        //this.commentsModel.getCommentForPosts(2).then(comments => {

        // })
    }

    handlerCommentFormSubmit() {
        //logica de add comment
        // this.commentsModel.createComment(userId, commentBody)
        // pentru aplicatia noastra vom transmite intotdeauna id 1 pentru user
    }
}

new PostDetailsView();