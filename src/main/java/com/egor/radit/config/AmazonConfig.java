package com.egor.radit.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonConfig {

    @Value("${AWSKEY}")
    private String awsAccessKey;

    @Value("${AWSSECRET}")
    private String awsSecret;

    @Bean
    @ConditionalOnProperty(name = "service.mock", havingValue = "false")
    public AmazonS3 s3() {
        AWSCredentials awsCredentials =
                new BasicAWSCredentials(awsAccessKey, awsSecret);

        return AmazonS3ClientBuilder
                .standard()
                .withRegion("us-east-2")
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

    @Bean
    @ConditionalOnProperty(name = "service.mock", havingValue = "true")
    public AmazonS3 amazonS3() {
        AWSCredentials awsCredentials =
                new BasicAWSCredentials(awsAccessKey, awsSecret);

        return AmazonS3Client.builder()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("http://localhost:4566", ""))
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
