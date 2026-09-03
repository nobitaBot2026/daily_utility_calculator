import {Component} from '@angular/core'; import {RouterOutlet,RouterLink} from '@angular/router';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink],template:`
<header class="top">
    <div class="nav wrap">
        <a class="brand" routerLink="/"
            ><span class="brand-mark">DU</span><span>Daily <b>Utility</b></span></a
        >
        <nav><a routerLink="/">Home</a><a href="#categories">Categories</a><a href="#popular">Popular</a></nav>
        <a class="all-btn" href="#categories">Explore tools</a>
    </div>
</header>
<main><router-outlet /></main>
<footer>
    <div class="wrap footer-in">
        <div>
            <div class="brand footer-brand">
                <span class="brand-mark">DU</span><span>Daily <b>Utility</b></span>
            </div>
            <p>Simple tools. Instant results. No login.</p>
        </div>
        <div class="privacy">🔒 Calculations happen in your browser. We don't store your inputs.</div>
    </div>
</footer>
`}) export class AppComponent{}
