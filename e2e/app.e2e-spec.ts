import { StarWarsTriviaPage } from './app.po';

describe('star-wars-trivia App', () => {
  let page: StarWarsTriviaPage;

  beforeEach(() => {
    page = new StarWarsTriviaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
