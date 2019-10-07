class Post{
    constructor(title,published,author,content,externalUrl,user){
        this.title=title;
        this.published=published;
        this.author=author;
        this.content=content;
        this.externalUrl=externalUrl;
        this.user=user;
    }
}

module.exports = Post;