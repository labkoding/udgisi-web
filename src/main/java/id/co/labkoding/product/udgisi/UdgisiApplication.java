package id.co.labkoding.product.udgisi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class UdgisiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UdgisiApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
//				.route(r -> r.path("/api/**")
//						.filters(f -> f.stripPrefix(1))
//						.uri("lb://udgisi-service"))
				.route("path_route", r -> r.path("/fmpkcxgwv4zuecddsnk65htcrvnt9ae4jc3h58b4")
						.uri("lb://Backoffice"))
				.build();
	}

}
