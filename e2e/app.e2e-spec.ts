import { Ng2CountriesTriviaPage } from './app.po';

describe('ng2-countries-trivia App', function() {
  let page: Ng2CountriesTriviaPage;

  beforeEach(() => {
    page = new Ng2CountriesTriviaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
