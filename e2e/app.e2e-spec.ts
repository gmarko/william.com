import { William.ComPage } from './app.po';

describe('william.com App', () => {
  let page: William.ComPage;

  beforeEach(() => {
    page = new William.ComPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
