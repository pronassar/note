import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: 'breadcrumb.html',
	styleUrls: ['breadcrumb.css']
})

export class BreadcrumbComponent implements OnInit {

	breadcrumbs: Array<any> = [];

	constructor(private router: Router, private route: ActivatedRoute){}

	ngOnInit(){
		this.router.events
		.pipe(filter(event => event instanceof NavigationEnd))
		.subscribe(() => this.createBreadcrumb(this.route.root));
	}

	createBreadcrumb(route: ActivatedRoute, url: string = '#', breadcrumbs = []){
		let children: ActivatedRoute[] = route.children;
		if(breadcrumbs.length == 0){
			this.breadcrumbs = breadcrumbs;
		}

		for(let child of children){
			let path = child.snapshot.url.map(item => item.path).join('/'),
				label: string = child.snapshot.data['breadcrumb'],
				title = child.snapshot.queryParams && child.snapshot.queryParams.title;

			label = label ? label : path;
			label = (label.indexOf('/') != -1) && title ? title : label;
			if (path != '' && path != '#') breadcrumbs.push({path, label});
			this.createBreadcrumb(child, url, breadcrumbs);
		}

	}

}