import {Component} from '@angular/core'; import {RouterOutlet,RouterLink} from '@angular/router';
@Component({
selector:'app-root',
standalone:true,
imports:[RouterOutlet,RouterLink],
template:`
<header class="top">
    <div class="nav wrap">
        <a class="brand" routerLink="/"
            ><span class="brand-mark">DU</span><span>Daily <b>Utility</b></span></a
        >
        <nav><a routerLink="/">Home</a><a href="#categories">Categories</a><a href="#popular">Popular</a></nav>
        <a class="all-btn" href="#categories">Explore tools</a>
    </div>
</header>
<main><router-outlet />
    <!-- <div class="whatsApp">
    <a target="_blank">
        <img
        src="assets/images/whatsapp-footer-fixed-icon.svg" alt="icon" class="whatsApp_img">  
        <div class="circleIconPanel hideMessage"></div>
    </a>
    </div> -->
</main>
<footer>
  <div class="wrap footer-in">
    <div>
      <div class="brand footer-brand">
        <span class="brand-mark">DU</span>
        <span>Daily <b>Utility</b></span>
      </div>

      <p>Simple tools. Instant results. No login.</p>
    </div>

    <div class="privacy">
      🔒 Calculations happen in your browser. We don't store your inputs.
    </div>
  </div>

  <div class="wrap footer-in">
    <div class="privacy">
      📞 Need a website or web application?
      <strong>Let's build it together.</strong>
      Contact me for Web development, responsive websites,
      dashboards and custom web applications.
    </div>

    <a
      class="whatsapp-link"
      href="https://wa.me/918947845449?text=Hi%2C%20I%27m%20looking%20for%20a%20website%20or%20web%20application%20and%20would%20like%20to%20discuss my%20project%20with%20you."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact me on WhatsApp"
    >
      <img
        class="whatsapp_icon"
        src="assets/images/whatsapp-footer-fixed-icon.svg"
        alt="WhatsApp"
      />
    </a>
  </div>
</footer>
`}) export class AppComponent{}
