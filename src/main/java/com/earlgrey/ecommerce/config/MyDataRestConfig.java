package com.earlgrey.ecommerce.config;

import com.earlgrey.ecommerce.entity.Product;
import com.earlgrey.ecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] disabledActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(disabledActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(disabledActions)));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(disabledActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(disabledActions)));
    }
}
