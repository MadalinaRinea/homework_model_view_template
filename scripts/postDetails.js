class PostDetailsView {
    postsModel = new PostsModel();
    usersModel = new UsersModel();
    commentsModel = new CommentsModel();

    constructor() {
        const id = this.getPostId();
        const post = this.postsModel.getPostById(id);
        this.hidrateHtml(post);

        this.postComm = this.handleCommentFormSubmit;

        document.querySelector('[data-comment-form]').addEventListener("submit", e => this.postComm(e));
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
        });
    }

    hidrateAuthor(post) {
        // http://jsonplaceholder.typicode.com/users/1
        this.usersModel.getUserById(post.userId).then(user => {
            const authorElem = document.querySelector('[data-post="author"]');
            
            authorElem.innerText = user.name;
        });
    }

    hidrateComments(post) {
        // http://jsonplaceholder.typicode.com/posts/2/comments
        this.commentsModel.getCommentForPosts(post.id).then(comments => {
            const fragment = document.createDocumentFragment();

            for (const comment of comments) {
                
                const i = document.createElement('i');
                const h = document.createElement('h5');
                const p = document.createElement('p');

                h.innerText = comment.email + " :";
                i.innerText ='"' +  comment.body + '"';

                p.append(i);
                fragment.append(h, p);
            }
            
            this.appendComments(fragment)

        });
    }

    appendComments(fragment) {
        const comments = document.querySelector('[data-post="comments"]');

        comments.append(fragment);
    }

    handlerCommentFormSubmit(e) {
        e.preventDefault();
        //logica de add comment

        const comment = document.querySelector("[data-comment]").value;
        const email = "madalina.rinea@yahoo.com";

        this.commentsModel.createComment(comment, email).then(console.log);
        // pentru aplicatia noastra vom transmite intotdeauna id 1 pentru user
    }
}

new PostDetailsView();