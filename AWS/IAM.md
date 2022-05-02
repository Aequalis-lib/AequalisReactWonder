---

Author: "THANUSH PRAVEEN"
Source: "UDEMY"
DATE: "2020-05-02"
EstimatedTime: 1hr

---

# IAM

IAM is a service that allows you to create and manage AWS Identity and Access Management (IAM) users and roles.

## IAM Basics

This section will cover the basics of IAM.

```
Note : 
1) IAM doesnot need region.
2) Try to avoid using the root user login, as it contains all the permissions.
3) Protect the Root user login from being used by other users by adding MFA to it. 
(SUGGESTED MFA is Authy by Twillio )
```

**Create an IAM user**

```
1) Click on Add users on the home page.

2) Enter the user name and select the acceess type the next page.

3) **If needed** , Create a Group with a group name and the permissions for the 
particular group. ( One User can be part of multiple groups)

4) Add the user to the ==group==.

5) Click on the Create User button.

6) **If needed** , After creating a user change the *Account Alias* to the unique 
name( As numbers are difficult to remember).
```

## IAM Policies

IAM policies are used to control access to AWS resources.

``` markdown
1) Go to user groups and click the user you need give policies to.

2) Click Permission Policies under Permission Tab and add permissions.

3) Under Policies, select any policy and Click Permission -->  {}JSON Policy and
 view the policy.

4) You can also create your own policies by clicking Create Policies option
```

## How can user access the AWS resources?

``` markdown
    1) AWS Management Console

    2) AWS CLI (Tool to access AWS from command-line shell used to direct access to the 
    public APIs of AWS services.)

    3) AWS SDK (Set of libraries that can be using alone with any framework to access 
    AWS services.)(JavaScript C++ ,Java, Python, Ruby, Node.js, PHP, etc.)

    4) Access Keys are generated through the AWS Console.
    (Access Keys are Secret, Just like passwords. Don't share them)
        - Access Key ID ~= username
        - Secret Access Key ~= password
```

## How to install the AWS CLI?

This topic describes how to install or update the latest release of the AWS Command Line Interface (AWS CLI) on supported operating systems.

> https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

> Note: Use ***aws --version*** to check the version of the AWS CLI.

> Use ***aws configure*** and enter the following:

```
    1) Region
    2) Access Key ID
    3) Secret Access Key
```

> Use ***aws iam list-users*** to check the users.
