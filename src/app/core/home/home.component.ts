import {Component} from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: [
		`:host{
			display: block;
		    height: calc(100vh - 56px);
			background: url(/assets/images/home.jpg);
		    background-size: cover;
		    background-position: top center;
		}`,
		`.overlay {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5)
		}`,
		`.content {
			position: relative;
    		top: 50%;
			transform: translateY(-50%);
		}`,
		`h1 {
			font-size: 70px;
		}`
	]
})
export class HomeComponent {

}