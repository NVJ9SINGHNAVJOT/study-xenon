# StudyXenon

Study Xenon is an EdTech (Education Technology) web application developed using the MERN stack.

## Note

- This project is created for learning purposes and can be used as a personal project.
- This project ***can be deployed on a live server*** as ***all features*** all fully ***operational***.


***

## Features

#### User Authentication :
- Study Xenon ensures secure user registration and authentication using **JWT (JSON Web Tokens)**. Users can easily sign up, log in, and manage their profiles with confidence.
- **Bcrypt** is used for password hashing, adding an extra layer of security to user data.

#### Courses and Lessons :
- Instructors have the capability to **create and edit courses**. Meanwhile, students can enroll in these courses, access relevant materials, and keep track of their progress.

#### Progress Tracking :
- Study Xenon empowers students to **monitor their progress** within enrolled courses. They can view completed lessons and post reviews about courses.
 
#### Payment Integration :
- The platform seamlessly integrates with **Razorpay** for secure payment processing. Users can make payments for course enrollment and other services using various supported payment methods.
 
#### User Edit Details :   
- Get information about your account, including your name, email, and other relevant details.
- Users can edit account information as needed.
  
#### Instructor Dashboard :
- Instructors gain access to a comprehensive dashboard. This dashboard provides insights into their courses, students, and income. **Visualizations and charts** present data intuitively, allowing instructors to monitor student enrollment, track course performance, and view income generated from course sales.

#### Admin :
- Admins can **access all** information about courses, students, instructors, and reviews.


## Installation

1. Clone the repository to your local machine.
	```
	git clone https://github.com/NVJ9SINGHNAVJOT/study-xenon.git
	```
2. Set up environment variables.
	In root directory  /backend and /frontend **.env.example** file is present replace it with **.env** file and set required variables for running application *(.env.example contains all variables examples)*.
3. Install the required packages.
	```
	cd study-xenon
 	cd backend
	npm install
	cd ..
 	cd frontend
	npm install
	```

4. Start development servers
   	- backend
 	```
 	cd backend
	npm run dev
	```
  	- frontend
  	```
 	cd frontend
	npm run dev
  	```

4. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000).

## Important

- First create admin account by going to [`http://localhost:3000/admin/signup`](http://localhost:3000/admin/signup), then login and create category. 
- e.g. Web Devlopment, Python, etc (without categories courses cannot be added).


***


## Video

https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/f47ce681-a484-40bc-96db-c37e97d2bb96

## Screenshots

![home_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/7b8f05a3-bdaa-4c3b-ab1d-a508e2a8aaae)

<details>
  <summary>More screenshots</summary>

![course_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/304104ee-6b73-48b2-9e21-50954dd27fdb)
![instructor_dashboard](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/e59b148c-3bf0-44b9-b5ee-840491636270)
![contact_us_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/3a7db15f-adcd-467c-9d56-9ba12b945143)
![catalog_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/3223e0c2-c4af-4313-ab0e-3e609ef63d04)
![admin_dashboard-1](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/0f29f52d-d4ab-496e-b7b9-7e9626e63905)
![admin_dashboard-2](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/10cbcfc7-1550-45ac-bdfa-4353f336d282)
![about_us_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/7a02a69e-bb52-4580-b076-c4b996fdebd6)
![student_dashboard](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/3fffb35f-9e13-4ed0-ace7-1849a8686e3b)
![sign_up_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/0c9bf505-9603-4c49-809e-92a09c87fd39)
![profile_page](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/4c65371e-fdd6-483f-aaa2-0bfe160c0290)
![mail_send](https://github.com/NVJ9SINGHNAVJOT/study-xenon/assets/121451924/7787351b-5320-434e-b5cb-75b91c64d3c2)

</details>


***

