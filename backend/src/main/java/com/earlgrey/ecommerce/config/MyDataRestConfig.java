package com.earlgrey.ecommerce.config;

import com.earlgrey.ecommerce.entity.Product;
import com.earlgrey.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

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
        
        exposeIds(config);
    }


    /**
     * Helper method that exposes id of categories in Spring REST api.
     * @param config
     */
    private void exposeIds(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entityTypes = entityManager.getMetamodel().getEntities();

        List<Class> entityClasses = new ArrayList<>();

        entityTypes.forEach(type -> entityClasses.add(type.getJavaType()));

        config.exposeIdsFor(entityClasses.toArray(new Class[0]));

    }
}
