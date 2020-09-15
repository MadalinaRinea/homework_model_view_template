class PostListView {
    postsModel = new PostsModel();
    
    constructor() {
        this.postsModel.getAllPosts()
            .then(posts => {
                const html = this.buildHtml(posts);
                this.displayPostList(html);
            });
    }

    buildHtml(posts) {
        const fragment = document.createDocumentFragment();

        for (const post of posts) {
            // <p><a href="postDetatails.html?id=1">Post Title</a></p>
            const p = document.createElement('p'); // am creat p
            const a = document.createElement('a'); // am creat a
            p.append(a); // am inclus a in p
            a.innerText = post.title; // am adaugat "Post Title"
            a.href = 'postDetails.html?id=' + post.id; // am creat href

            fragment.appendChild(p);
        }

        return fragment;
    }

    displayPostList(html) {
        const container = document.querySelector('[data-post-container]')

        container.appendChild(html);
    }
}

new PostListView();
