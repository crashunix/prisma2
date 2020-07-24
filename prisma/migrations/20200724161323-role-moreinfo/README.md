# Migration `20200724161323-role-moreinfo`

This migration has been generated at 7/24/2020, 4:13:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

ALTER TABLE "public"."Post" DROP COLUMN "title",
ADD COLUMN "publishDate" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "midia" text   ;

ALTER TABLE "public"."User" ADD COLUMN "nickname" text  NOT NULL ,
ADD COLUMN "role" "Role" NOT NULL DEFAULT E'USER',
ADD COLUMN "password" text  NOT NULL ,
ALTER COLUMN "name" SET NOT NULL;

CREATE UNIQUE INDEX "User.nickname" ON "public"."User"("nickname")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200724121730-create_user_post_tables..20200724161323-role-moreinfo
--- datamodel.dml
+++ datamodel.dml
@@ -2,25 +2,34 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
   id Int @id @default(autoincrement())
-  name String?
+  name String
+  nickname String @unique
   email String @unique
+  role Role @default(USER)
+  password String
   posts Post[]
 }
 model Post {
   id Int @id @default(autoincrement())
-  title String?
   text String
   authorId Int
   author User @relation(fields: [authorId], references: [id])
+  publishDate DateTime @default(now())
+  midia String?
+}
+
+enum Role {
+  USER
+  ADMIN
 }
```


