package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.BrandDto;
import com.synechron.backend_app.mapper.BrandMapper;
import com.synechron.backend_app.models.Brand;
import com.synechron.backend_app.repositories.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandService {
    private BrandRepository brandRepository;
    private BrandMapper brandMapper;
    public BrandService(BrandRepository brandRepository, BrandMapper brandMapper) {
        this.brandRepository = brandRepository;
        this.brandMapper = brandMapper;
    }

    public List<BrandDto> findAllBrands() {
        List<Brand> brands = brandRepository.findAll();

        List<BrandDto> brandDtos = new ArrayList<BrandDto>();

        for (Brand b: brands) {
            brandDtos.add(brandMapper.fromEntityToDto(b));
        }

        return brandDtos;
    }
}
