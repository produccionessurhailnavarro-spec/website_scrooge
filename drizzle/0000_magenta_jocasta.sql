CREATE TABLE `school_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`school` text NOT NULL,
	`contact` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`performance` text NOT NULL,
	`students` integer NOT NULL,
	`companions` integer NOT NULL,
	`comments` text NOT NULL
);
