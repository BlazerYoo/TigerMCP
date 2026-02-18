# PrincetonInfo docs

## Introduction

The PrincetonInfo API provides name and description of either all departments or a single department by deptid.

## Resources

### department

* **Description** : provides description of all departments.
* **Method** : GET
* **URI-Template** : /department
* **Parameter** : none.
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json, array of many single-property objects sorted by the single description property.
* **Sample Call** : /department
* **Sample Result** : [ { "dept": "Academic Technology Services" }, { "dept": "Admission" }, { "dept": "Adv - Alumni Engagement" }, ... ]

### departments

* **Description** : provides name and descriptions of all departments.
* **Method** : GET
* **URI-Template** : /departments
* **Parameter** : none
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json, array of many objects sorted by one of the description properties.
* **Sample Call** : /departments
* **Sample Result** : [ { "deptid": "41223", "descr": "Academic Technology Services", "pu_dept_long_descr": "Academic Technology Services, Office of Information Technology", "pu_dept_prog": "41223", "descrshort": "Aca Tch S" }, { "deptid": "51600", "descr": "Admission", "pu_dept_long_descr": "Admission", "pu_dept_prog": "51600", "descrshort": "Admission" }, ... ]

### departments/{id}

* **Description** : provides name and descriptions of a single department by deptid.
* **Method** : GET
* **URI-Template** : /departments/{id}
* **Parameter** : id is deptid.
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json, a single object if department with deptid == {id} exists, otherwise 404 Not Found.
* **Sample Call** : /departments/26000
* **Sample Result** : { "deptid": "26000", "descr": "Schl of Public & Int'l Affairs", "pu_dept_long_descr": "Princeton School of Public and International Affairs", "pu_dept_prog": "26000", "descrshort": "SPI" }

### alldepartment

* **Description** : provides description of all departments, including closed departments.
* **Method** : GET
* **URI-Template** : /alldepartment
* **Parameter** : none.
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json, array of many single-property objects sorted by the single description property.
* **Sample Call** : /department
* **Sample Result** : [ { "dept": "250th Anniversary (closed)" }, { "dept": "250th Anniversary (closed)" }, { "dept": "250th Anniversary (closed)" }, { "dept": "A/C Math (closed)" }, ... ]

### alldepartments

* **Description** : provides name and descriptions of all departments, including closed departments.
* **Method** : GET
* **URI-Template** : /alldepartments
* **Parameter** : none
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json, array of many objects sorted by one of the description properties.
* **Sample Call** : /departments
* **Sample Result** : [ { "deptid": "724", "descr": "Academic Technology S (closed)", "pu_dept_long_descr": "Academic Technology Services, Office of Information Technology", "pu_dept_prog": "724", "descrshort": "Aca Tch S" }, { "deptid": "41223", "descr": "Academic Technology Services", "pu_dept_long_descr": "Academic Technology Services, Office of Information Technology", "pu_dept_prog": "41223", "descrshort": "Aca Tch S" }, ... ]

### alldepartments/{id}

* **Description** : provides name and descriptions of a single department by deptid, including closed departments.
* **Method** : GET
* **URI-Template** : /alldepartments/{id}
* **Parameter** : id is deptid.
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json, a single object if department with deptid == {id} exists, otherwise 404 Not Found.
* **Sample Call** : /departments/23200
* **Sample Result** : { "deptid": "23200", "descr": "Plasma Physics Instrc (closed)", "pu_dept_long_descr": "Astrophysical Sciences, Plasma Physics Laboratory", "pu_dept_prog": "PPL", "descrshort": "Plasma Phy" }

### Health Check

* **Method** : GET
* **URI-Template** : /health_check
* **Request Body** :
* **Request Header** : Content-Type=application/json [OPTIONAL].
* **Output** : application/json. The output will be a message indicating the status of the api.
* **Sample Call** : /health_check
* **Sample Result** : [ { "response": "OK api_princetoninfo@dwprod.world is ACTIVE." } ]