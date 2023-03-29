import { API } from "./util";

export default class InfiniteTweets {
  constructor(rootEl) {
    // Your code here
    this.rootEl = rootEl;
    this.fetchTweetsButton = document.querySelector('.fetch-tweets-btn');
    this.tweetsContainer = document.querySelector('.tweets');
    this.fetchTweetsButton.addEventListener('click', e => this.handleFetchTweets(e));
  }

  async handleFetchTweets(event) {
    // Your code here
    event.preventDefault();
    this.fetchTweetsButton.innerText = 'Fetching...';
    this.fetchTweetsButton.disabled = true;
    const fetchedTweets = await API.fetchTweets({
      type: this.rootEl.dataset.type,
      offset: this.tweetsContainer.children.length
    });
    this.fetchTweetsButton.innerText = 'Fetch more tweets!';
    this.fetchTweetsButton.disabled = false;
    fetchedTweets.forEach((tweet) => this.appendTweet(tweet));
    // Remove fetch tweets button if you've run out of tweets to fetch
    if (fetchedTweets.length < 10) {
      const noMoreTweets = document.createElement("p");
      noMoreTweets.innerText = "No more tweets!";
      // Your code here
      this.fetchTweetsButton.replaceWith(noMoreTweets);
    }
  }

  appendTweet(tweetData) {
    const tweetEl = this.createTweet(tweetData);
    // Your code here
    this.tweetsContainer.append(tweetEl);
  }

  createTweet(tweetData) {
    const li = document.createElement("li");
    // Your code here
    const tweet = document.createElement('div');
    tweet.classList.add('tweet');

    const author = document.createElement('h3');
    author.classList.add('author');

    const authorLink = document.createElement('a');
    authorLink.href = `/users/${tweetData.author.id}`;
    authorLink.innerText = `@${tweetData.author.username}`;

    author.append(authorLink);

    const createdAt = document.createElement('span');
    createdAt.classList.add('created-at');
    createdAt.innerText = new Date(tweetData.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' });

    const body = document.createElement('p');
    body.innerText = tweetData.body;

    tweet.append(author);
    tweet.append(createdAt);
    tweet.append(body);

    if (tweetData.mentionedUser) {
      const mentionedUser = document.createElement('div');
      mentionedUser.classList = 'mentioned-user';
      mentionedUser.innerText = 'Mentions: ';

      const mentionedUserLink = document.createElement('a');
      mentionedUserLink.href = `/users/${tweetData.mentionedUser.id}`;
      mentionedUserLink.innerText = `@${tweetData.mentionedUser.username}`;

      mentionedUser.append(mentionedUserLink);
      tweet.append(mentionedUser);
    }

    li.append(tweet);

    return li;
  }

  // Helper methods...
}