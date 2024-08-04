
// import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';

// imports[CommonModule, ReactiveFormsModule]

// attractionForm!: FormGroup;

// ngOnInit(): void {
// 	this.attractionForm = new FormGroup({
// 		name: new FormControl(''),
// 		city: new FormControl('')
// 	})
// }

// submitForm(){
// 	console.log(this.attractionForm.value)
// 	console.log(this.attractionForm.value.name)
// 	console.log(this.attractionForm.value.city)
// }


// <form[formGroup]="attractionForm"(ngSubmit) = "submitForm()" >
// 	<input type="text" name = "name" id = "name" class="form-control" placeholder = "Attraction Name" formControlName = "name" >
// 		<button class="btn btn-primary" > Add Attraction </button>
// 			</form>


// 			******************* Two Way Binding *******************
// import { FormsModule, NgForm } from '@angular/forms';

// imports: [FormsModule],

// 	submitForm(form: NgForm){
// 	console.log("Clicked")
// 	console.log(form.value)
// }

// <form #tripForm="ngForm"(ngSubmit) = "submitForm(tripForm)" >
// 	<input type="text" name = "name" id = "name" class="form-control" placeholder = "Trip Name" ngModel >
// 		<button type="submit" class="btn btn-primary" > Add Trip </button>
// 			</form>


// 			******************** Two Way with Reference ***************
// import { FormsModule, NgForm } from '@angular/forms';

// imports: [FormsModule],
// 	user!: User

// ngOnInit(): void {
// 	this.user = { _id: "", username: "", password: "", name: "" }
// }

// submitForm(form: NgForm){
// 	console.log(form.value)
// }


// <form #tripForm="ngForm"(ngSubmit) = "submitForm(tripForm)" >
// 	<input type="text" name = "name" id = "name" class="form-control" placeholder = "Full Name"[(ngModel)] = "user.name" >
// 		<button type="submit" class="btn btn-primary" > Register </button>
// 			</form>


// 			*********************** Promised Request ***********************
// 				bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
// 					.then((salt) => bcrypt.hash(req.body.password, salt))
// 					.then((hashedPWD) => _createUserObject(req, hashedPWD))
// 					.then(newUser => dataAccess.addNewUser_promise(newUser))
// 					.then(data => {
// 						response.status = 201
// 						response.text = "User created successfully..."
// 					})
// 					.catch(error => {
// 						response.status = 401
// 						response.text = error
// 					})
// 					.finally(() => {
// 						_sendResponse(res, response)
// 					})

// const _createUserObject = function (req, hashedPWD) {
// 	return new Promise((resolve, reject) => {
// 		const user = {
// 			"name": req.body.name,
// 			"username": req.body.username,
// 			"password": hashedPWD
// 		}
// 		resolve(user)
// 	});
// }


// 	************************* MONGO Exports *******************
// 		//////Export Commands ////////
// 		mongodump--db meanGame    //Export to dump/dbNameFolder/    two files for each collection (.json/.bson)
// mongodump--db meanGames--gzip //Export to dump/dbNameFolder/    two files for each collection (.json.gz/.bson.gz)
// mongodump--db travelingMap--gzip--out C: \dump\Week1 - Project   //Export to selected directory

// mongoexport--db meanGames--collection users--out    			/// generate .json file for chosed collection
// output / game - users.json--jsonArray--pretty

// ///// Import Commands ////
// mongoimport--db meanGames--collection users -
// 	jsonArray output / technology.json

// mongorestore--gzip dump\