import * as firebase from 'firebase';
export class AuthService {
	authenticated: boolean = false;
	token: string;

	signup(email: string, password: string){
		return new Promise<any>((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.catch(error => console.log(error)).then((data:any) => {
					this.getToken();
					resolve(data);
				});
		})
	}

	login(email: string, password: string){
		return new Promise<any>((resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password)
				.catch(error => console.log(error)).then((data:any) => {
					this.getToken().then(tk => {
						resolve(data);
					})
				});
		})

	}

	logout(){
		return firebase.auth().signOut().catch(error => console.log(error));
	}

	getToken(){
		return new Promise<string>((resolve, reject)=>{
			firebase.auth().currentUser.getIdToken().then((tk:string) => {
				this.token = tk;
				resolve(tk);
			});
		})
		
	}

}