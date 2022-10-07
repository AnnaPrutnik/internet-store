PET Project:

Name: internet store,
Includes server and client parts.

Server: based on Express.js. Used library:
1.Sequelize - work with DB. 2. cookie-parser - engage with cookie. 3. bcrypt - hashing password. 4. jsonwebtoken - generate with tokens. 5. Nodemailer - send activation letters;

Diagram: https://drive.google.com/file/d/1OHtbsAM7VAk1CvZKset2_oAZTQAXxqNz/view?usp=sharing

<!--
//TODO in React for working with file!!
for upload photo in HTML should be:
<html>
  <body>
    <form ref='uploadForm'
      id='uploadForm'
      action='http://localhost:8000/upload'
      method='post'
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>
  </body>
</html> -->
