Currently the Server is running on : https://vkp-x-library.herokuapp.com/

- BASEUrl - https://vkp-x-library.herokuapp.com/
- Connect your mongoDb: 
    - create .env file
    - define a variable "DB_CONNECTION" and initialize its value as your mongoDb string

- To check if code (set-up) is working fine
  - GET BASEUrl/test

- To Register Student
  - POST BASEUrl/register
  - type is Zero (0) for student
  - Sample request object:-
    {
        type: 0, 
        data: {
            "name": "Vaibhav",
            "year": 3,
            "branch": "IT",
            "registerationNumber": 19400,
            "password": "19400"
        }
    }

- To see all students data
  - GET BASEUrl/students

- To search student by name
  - GET BASEUrl/students/name

- To register as Teacher
    - POST BASEUrl/register
    - type is one (1) for teachers
    - sample request object :-
    {
        type: 1,
        data: {
            "name": "Teacher",
            "branch": "IT",
            "teacherId": 12345,
            "password": "11111"
        }
    }

- CRUD operations on BOOKS
    - save a book
        - POST BASEUrl/book
        - sample req obj (refer code's comments for better understanding):
        {
            type: 1,
            book: { 
                "name": "Rich Dad Poor Dad",
                "bookId": 12345,
                "numberOfUnits": 4
            }
        }
    - See all books
        - GET BASEUrl/book
    - See books by name
        - GET BASEUrl/book/:bookName
    - Update Book by bookId
        - PATCH BASEUrl/book/bookId
    - delete a Book
        - DELETE BASEUrl/book/bookId
