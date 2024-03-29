package fsystem

import (
	"context"
	"fmt"
	"internal/env"
	"io"
	"log"
	"os"

	"cloud.google.com/go/storage"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

var ctx = context.Background()

func CreateStorageApplication() *storage.BucketHandle {
	bucketName := env.ReadEnv("FIREBASE_BUCKET")
	pathToFile := env.ReadEnv("FIREBASE_ADMINSDK_STORAGE")
	wd, _ := os.Getwd()
	config := &firebase.Config{
		StorageBucket: fmt.Sprintf("%s.appspot.com", bucketName),
	}
	fmt.Println(fmt.Sprintf("%s%s", wd, pathToFile))
	opt := option.WithCredentialsFile(fmt.Sprintf("%s%s", wd, pathToFile))
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalln(err)
		return nil
	}

	client, err := app.Storage(context.Background())
	if err != nil {
		log.Fatalln(err)
		return nil
	}

	bucket, err := client.DefaultBucket()
	if err != nil {
		log.Fatalln(err)
		return nil
	}
	return bucket
}

func SendFileToBucket(file *os.File, dest string) error {
	bucket := CreateStorageApplication()
	obj := bucket.Object(dest)
	writer := obj.NewWriter(ctx)

	_, err := io.Copy(writer, file)
	if err != nil {
		log.Fatalf("Failed to upload file to Firebase Storage: %v", err)
		return err
	}

	if err := writer.Close(); err != nil {
		log.Fatalf("Failed to close Firebase Storage writer: %v", err)
		return err
	}
	return nil
}

func RemoveFileFromBucket(bucketId string) error {
	bucket := CreateStorageApplication()
	obj := bucket.Object(bucketId)
	if err := obj.Delete(ctx); err != nil {
		return err
	}
	return nil
}
