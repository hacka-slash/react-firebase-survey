..*In this tutorial we are using firebase. I might look to recreate it using MongoDB.

..*The firebase users permissions we gave are to allow any user to read or write. We said "Auth" === "null" indicating we don't need authorization. 
    ..*However, I could not find this in the new updated firebase website. Must find how to actually give any user permissions to read and write.
..*OVERVIEW: This app simply takes a user's name and saves the answers they give to our questions into our database. Our database has been modified to require no authentication which is usually a no-no, but for simplicity of this tutorial it was allowed. 
 
 
 
 ..*To find the config key, I had to register the app, give it a nickname, then copy/paste the firebaseConfig

  ..*For the input field I used ref="nameBox" and used this to get the value in the submit function. This works well but was still given an warning in the log saying "String refs are a source of potential bugs and should be avoided. Recommend using 'useRef()'
    ..*Learn more @https://fb.me/react-strict-mode-string-ref 


..*Currently there is no CSS for my card

..*QuestionSubmit() error: As trying to submit the answers and save to my database, I am getting an error saying 'PERMISSION DENIED'. Online it is saying this is because only administrative users are allowed to read/write. Permissions/rules must be changed, although I thought this was done in the beggining of the tutorial. Will double check.
 ..*!* SOLVED: By default, when we create a new database in Firebase, it is in 'CloudFire Store' Mode, or Beta. We must select from the dropdown to put it into 'Realtime Database' Mode, and then edit the 'Rules' to allow Read/Write:
    ..*https://stackoverflow.com/questions/37403747/firebase-permission-denied : I was facing similar issue and found out that this error was due to incorrect rules set for read/write operations for real time database. By default google firebase nowadays loads cloud store not real time database. We need to switch to real time and apply the correct rules.