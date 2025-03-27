ALTER TABLE "users" RENAME TO "product";--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "category" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "productName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "delivery" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "description" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "dimensions" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "material" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "age";--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "email";