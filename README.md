## FULL EXPRESS BACKEND WITH AUTHORIZATION AND AUTHENTICATION

## INSTALL AND RUN

```bash
    git clone https://github.com/Per-Scholas-Hassan-Razak/mod15-taskmaster.git
    cd mod15-taskmaster

    # install modules
    npm i

    # run application
    npm run dev
```

## API ENDPOINT DEFINITION 

### baseURL: [http://localhost:3000/api]

### User Routes [http://localhost:3000/api/users]
    - router.post("/register", createNewUser);
      - creates a new user
      - throws error if user already exists
    - router.post("/login", loginExistingUser);
      - logins a new user
      - validates credentials
      - validates password using bcrypt
      - return jwt token

### Project Routes  [http://localhost:3000/api/projects]
    - router.get("/", getAllProjects);
      - return all project for logged in user
    - router.post("/", createNewProject);
      - allows creation of project for logged in user
    - router.delete("/:id", deleteProject);
      - verifies logged in user with jwt token
      - uses req params to to locate project id
      - if projectid and owner(userId) match then delete is allowed otherwise error is thrown
    - router.put("/:id", updateProject);
      - verifies logged in user with jwt token
      - uses req params to to locate project id
        - use req body for update object
      - if projectiId and owner(userId) match then update is allowed otherwise error is thrown