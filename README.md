# Nadia-R.S Rule/Inference Engine
Open source project Nadia Rule/Policy Engine with React.js and Spring.
This project is based on original project [Nadia Rule/Inference Engine.](https://github.com/DeanLee77/Nadia) 
This project is based on original project [Nadia Rule/Inference Engine.](https://github.com/DeanLee77/Nadia).
<br/>
<br/>
Video is also available at [NADIA Policy / Business rules Engine from NExST.R&DLabs](https://youtu.be/xyWjscJ3LxI) <br/>
or <br/>
another link is [ Introduction of NADIA Policy / Business rules Engine from NExST.R&DLabs.](https://youtu.be/O-itMgYHRvc)
### **** Note: If you have cloned NADIA then you may need to run 'npm install' before you start Node server due to all changes around Babel and Webpack version upgrade ***

# ***Relevant NADIA project list***
[NADIA Java](https://github.com/DeanLee77/Nadia) <br/>
[NADIA C sharp](https://github.com/DeanLee77/NADIA-C.Sharp)<br/>
[NADIA Python (In Progress)](https://github.com/DeanLee77/NADIA-Python/)<br/>
[NADIA C/C++ (In Progress)](https://github.com/DeanLee77/NADIA-CPP)


## 1. Introduction
This project is building a Rules(Policies)/Inference Engine with ease of use and maintain rules/policies. It aims to be:

* A rule author is allowed to write rules or policies in a plain text file for the engine rule parser
* A rule author or business person does NOT need to implement the rules/policies separately like other rules engines
* A user of the engine can carry out Foward-chaining and Backward-chaining with a given rule/policy set

## 2. Installation/Running Project in Local
In order to install the project in your workspace, you may need to do followings;
 1. Install Gradle for buidling your project;
 2. Install Node.js including npm(node package manager);
 3. Install one of your preferable text editor;
 4. Install PostgreSQL, and set your database name and password. Once finished setting Database then you need to modify database related attributes in application.properties file in 'src/main/resource'folder;
 5. If your system is on Windows and Python has not been installed, then you need to install Python 2.7 at least.
 6. Once you have installed Python 2.7 then open up your command line/terminal then type 'npm install -g windows-build-tools', and 'npm config set python /path/to/executable/python2.7';
 7. once above tasks are done open up 'ClientSide' folder in command line/terminal then type 'npm install'. It will install all necessary packages for client side including 'React'.;
 8. when you done up until this point, then you may need to build the project at server side. Please import the project into your worksapce and go to Gradle build folder in Gradle Tasks window and open it up then click build then the project will be built;
 9. all relevant database tables need to be created before running 'NADIA', and 'DDL' file is at 'com.Nadia-R.S/src/main/resources/database/' folder;
 10. you now can run server for the project locally;
 11. you need to start Node server to see the actual GUI. Please open up 'ClientSide' folder in command line/terminal again and type 'npm start';
 12. you can now be able to play with 'Nadia' in your browser once you typed 'localhost:3000' in URL section of your browser.
 
 *Please note that there will be Demo video available soon.
## 3. Roadmap
Add more features as follows;

* GUI for Rule IDE (it is just more than editor. working as an development IDE)
* Retrieving Rule/Policy file from database (DONE with PostgreSQL in this version)
* Workflow engine with GUI based diagram editor 
* Machine Learning type inference mechanism (DONE in this version)

## 4. Contribution
If you would like to contribute to this project, then please create your own branch and name the branch clearly. Once the work is done in the branch then do 'pull request' and send an email to 'nexst.rndlabs@gmail.com'.

## 5. Make your own Rules/Policies
Please have a look at a file of testing rule. Within the example file, all indented rules uses 'Tab' key for indentation. The rule scanner considers of an indented rule as a child rule of previous rule in a rule text. All relevant steps to make your own rules are described in a number of '.png' files in the project named 'Nadia Rule Generation STEP 1....7', Hence please refer to steps when you create your own rules. 

## Note:
If you need a commercial or coustomised version of Nadia engine, then please contact on 'nexst.rndlabs@gmail.com'.

## 6. How does it work
There is a number of key components as follows;

* Rule reader     : reads a rule/policy file, stream source, string source
* Rule scanner    : scans what 'Rule reader' reads
* Rule parser     : parses what 'Rule scanner' scans into a rule/policy graph
* TopoSort        : sorts the graph parsed by 'Rule parser'
* Inferece Engine : checking all truth or calculated value within forward-chaining, and retrieving next rule/policy within backward-chaining to check in order to complete rule set logic

### How Backward-chaining and Forward-chaining work
Suppose there are following rules:

1. IF B or C is true THEN A is true.
2. IF D and E are true THEN C is true.
3. IF F is true THEN D is false.
4. IF G is false THEN E is true.

#### Backward-chaining:
An inference engine when using backward chaining searches the inference rules until it finds one which has a consequent (Then clause) that matches a desired goal. For instance, if we want to know whether or not the rule statement of 'A is true' is true, an engine finds out which rule has to be checked to conclude. In this case, the engine needs information about the rule statement of 'B is true', or 'F is true' and 'G is false'

#### Forward-chaining
An inference engine using forward chaining searches the inference rules until it finds one where the antecedent (If clause) is known to be true. For instance, if we do have facts that 'G is false' statement is false and 'F is true'statement is true then the engine concludes as follows;
* 'G is false' statement is false
* 'F is true' statement is true
* 'E is true' statement is false
* 'D is false' statement is true
* 'C is true' statement is false
* 'B is true' statement is unknown
* 'A is true' statement is unknown

1. IF either <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement B' is true; or <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement C' is true <br/>
   THEN <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement A' is true.
2. IF  both<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement D' is true; and <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement E' is true <br/>
   THEN <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement C' is true.
3. IF <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement F' is true<br/> 
   THEN <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement D' is false.
4. IF<br/> 
     &nbsp;&nbsp;&nbsp;&nbsp; 'statement G' is false <br/>
   THEN <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;'statement E' is true.

#### Backward-chaining:
An inference engine when using backward chaining searches the inference rules until it finds one which has a consequent (Then clause) that matches a desired goal. For instance, if we want to know whether or not the rule of 'statement A' is 'true' or 'not true(false)', an engine finds out which rule has to be checked to conclude. In this case, the engine needs information about the rule of 'statement B' is 'true' or 'not true(false)', or 'statement F' and 'statement G' are 'true' or 'not true(false)' respectively.

#### Forward-chaining
An inference engine using forward chaining searches the inference rules until it finds one where the antecedent (If clause) is known to be true. For instance, if we do have facts that 'statement G' is true and 'statement F' is true then the engine concludes as follows;
* 'statement G' is true
* 'statement F' is true
* 'statement E' is false due to that 'statement G' is not false
* 'statement D' is false due to that 'statement F' is true
* 'statement C' is false due to that 'statement D' is true and 'statement E' is false
* 'statement B' is unknown due to that there is not given information to infer about 'statement B'
* 'statement A' is false with given information of 'statement B' and 'statement C', however it could be changed based on conclusion  of 'statement B' because 'statement B' is unknown.


## 7. License
Copyright (c) 2017-2020 individual contributors.
Nadia-R.S is open source project and released under AGPL 3.0 License.
