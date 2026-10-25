import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Making useful things');
    expect(compiled.querySelector('.wordmark')?.textContent).toContain('Ali Hachem');
  });

  it('should link to each practice project demo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const demos = compiled.querySelectorAll('.project-link[href^="projects/"]');

    expect(demos).toHaveLength(6);
    expect(Array.from(demos, (link) => link.getAttribute('href'))).toEqual([
      'projects/personal-profile/',
      'projects/course-registration/',
      'projects/smartwatch-showcase/',
      'projects/feedback-portal/',
      'projects/coffee-shop/',
      'projects/web-design-schedule/',
    ]);
    expect(Array.from(demos).every((link) => !link.hasAttribute('target'))).toBe(true);
    expect(Array.from(compiled.querySelectorAll('.project-title-row h3'), (heading) => heading.textContent?.trim())).toEqual([
      'Personal Profile',
      'Course Registration',
      'Smartwatch Showcase',
      'Feedback Portal',
      'Coffee Shop Menu',
      'Web Design Schedule',
    ]);
    expect(compiled.querySelector('.all-demos')?.getAttribute('href')).toBe('projects/');
  });

  it('should provide a CV download and direct contact links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cvLink = compiled.querySelector<HTMLAnchorElement>('.hero-actions a[download]');

    expect(cvLink?.getAttribute('href')).toBe('assets/cv/Ali-Hachem-CV.pdf');
    expect(cvLink?.getAttribute('download')).toBe('Ali-Hachem-CV.pdf');
    expect(compiled.querySelector('.contact-link[href="mailto:develophashem@gmail.com"]')?.textContent)
      .toContain('develophashem@gmail.com');
    expect(compiled.querySelector('.contact-link[href="tel:78852588"]')?.textContent)
      .toContain('78852588');
    expect(compiled.querySelector('a[href="mailto:contact@alihachem.com"]')).toBeNull();
  });

  it('should highlight business development representative experience in expertise', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const expertiseItems = compiled.querySelectorAll('#skills .expertise-item');
    const businessDevelopment = Array.from(expertiseItems).find((item) =>
      item.querySelector('h3')?.textContent?.trim() === 'Business development'
    );

    expect(expertiseItems).toHaveLength(4);
    expect(businessDevelopment?.textContent).toContain('Speaking with customers and prospects');
    expect(businessDevelopment?.textContent).toContain('Lead generation');
    expect(businessDevelopment?.textContent).toContain('LinkedIn Sales Navigator');
    expect(businessDevelopment?.textContent).toContain('SignalHire');
  });
});