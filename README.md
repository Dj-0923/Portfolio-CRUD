# Mark-dj Villar Portfolio CRUD

A Laravel 12 portfolio built with Inertia.js and React. The Projects section is stored in SQLite and supports create, read, update, and delete operations.

## Run locally

1. Install PHP/Composer and Node.js/npm.
2. Install dependencies:

   ```sh
   composer install
   npm install
   ```

3. Configure `.env` to use SQLite, then prepare the database:

   ```sh
   php artisan migrate
   php artisan storage:link
   ```

4. Start Laravel and Vite:

   ```sh
   php artisan serve
   npm run dev
   ```

5. Open `http://127.0.0.1:8000`.

Use `npm run build` for production assets and `php artisan test` to run the test suite.

## Section and data

Projects are managed in the database because portfolio entries change over time and should be editable without changing application code. Each record includes a title, category, description, tools/tech stack, project URL, repository URL, image path, and completion date.

| Field | Database type | Purpose |
|---|---|---|
| `title` | string, 60 characters, unique | Project name and unique identifier for display |
| `category_id` | foreign key | Associates the project with a category |
| `description` | text | Describes the project |
| `tools` | string, 80 characters | Lists the technologies used |
| `project_url` | nullable string | Optional link to a live project |
| `repository_url` | nullable string | Optional source-code link |
| `image` | string | Relative path to the uploaded project image |
| `date_completed` | date | Records when the project was completed |

Uploaded images are stored under `storage/app/public/projects` and served through `public/storage`.

## Application request flow

The browser sends a request to a named route in `routes/web.php`. `ProjectController` loads or validates the data, uses the `Project` Eloquent model to read or update SQLite, and returns an Inertia response for a React page. Laravel validation errors are shared back to the React form, which retains its entered values through Inertia's `useForm`; success messages are shared as flash props.

The home page is `resources/js/Pages/Portfolio.jsx`. Project management uses `resources/js/Pages/Projects/Index.jsx`, `Create.jsx`, and `Edit.jsx`. The reusable form and field components live in `resources/js/Components/`.

## Validation rules

The controller validates the submitted values on the server:

- Title is required, at most 60 characters, and unique. Updating a project ignores that same project's ID.
- A user must choose an existing category or supply a new category name. New names are checked case-insensitively for duplicates.
- Description is required and must be between 20 and 300 characters.
- Tools are required and limited to 80 characters.
- Optional project and repository links must be valid URLs.
- Completion date is required and cannot be in the future.
- A new project's image is required; images must be JPG, PNG, or WEBP and at most 2 MB. Replacing an image is optional when editing.
- Custom validation messages explain title, category, description, completion-date, and image errors.

## Validation test table

Run these checks with `php artisan test --filter=ProjectValidationTest`. Automated results are recorded below.

| # | Test case | Expected result | Automated result |
|---|---|---|---|
| 1 | Submit an empty project form | Required-field errors are returned | Pass |
| 2 | Submit a title longer than 60 characters | Title error is returned | Pass |
| 3 | Update a project without changing its unique title | Update succeeds | Pass |
| 4 | Submit an invalid project URL | URL error is returned | Pass |
| 5 | Set a completion date in the future | Date error is returned | Pass |
| 6 | Upload a non-image file | Image error is returned | Pass |
| 7 | Upload an image larger than 2 MB | Image size error is returned | Pass |

## Midterm video and submission checklist

The remaining recording must be completed by the student because the activity requires a screen recording with the student's own voice. Show:

1. An introduction and why Projects was chosen.
2. The migration, model, controller, routes, React pages, and reusable components.
3. The request flow: Route → Controller → Validation → Model → Inertia → React Page.
4. Create, view, edit, and delete a record, including the public portfolio result.
5. Validation errors from the test table.
6. One new field and validation rule added live, without cutting the recording.

Screenshots of the public portfolio, project list, create page, edit page, delete confirmation, success message, and validation errors have been captured in `docs/activity-screenshots/` and included in `Midterm-Portfolio-CRUD-Documentation.pdf`. Before submission, add a VS Code/file-browser screenshot of the folder structure, fill in your class section, personalize the reflection, and add the final GitHub and viewable video links. The video itself, including the uninterrupted live field-and-validation change, must be recorded by the student.
