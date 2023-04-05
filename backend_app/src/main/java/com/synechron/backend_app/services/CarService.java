package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.pageable.PageableDto;
import com.synechron.backend_app.mapper.CarMapper;
import com.synechron.backend_app.models.Car;
import com.synechron.backend_app.repositories.CarRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class CarService {
    private static int PAGE_SIZE = 10;
    private CarRepository carRepository;

    private CarMapper carMapper;
    public CarService(CarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    private Long parseStringAsLong(String string) {
        try {
            return Long.parseLong(string);
        } catch (Exception e) {
            e.printStackTrace();
            throw new NumberFormatException(String.format("Cannot parse '%s' as Long!", string));
        }
    }

    private int parseStringAsInteger(String string) {
        try {
            return Integer.parseInt(string);
        } catch (Exception e) {
            e.printStackTrace();
            throw new NumberFormatException(String.format("Cannot parse '%s' as Integer!", string));
        }
    }

    private PageableDto createPageableDto(Page<Car> carsPage) {
        PageableDto dto = new PageableDto();

        carsPage.getContent().forEach(car -> {
            dto.getObjects().add(carMapper.fromEntityToDto(car));
        });
        dto.setHasNext(carsPage.hasNext());
        dto.setHasPrevious(carsPage.hasPrevious());
        dto.setSliceNumber(carsPage.getNumber());
        dto.setTotalElements(carsPage.getTotalElements());
        dto.setTotalNumberOfPages(carsPage.getTotalPages());

        return dto;
    }

    private PageableDto createEmptyPageableDto() {
        PageableDto dto = new PageableDto();
        dto.setHasNext(false);
        dto.setHasPrevious(false);
        dto.setSliceNumber(0);
        dto.setTotalElements(0);
        dto.setTotalNumberOfPages(0);

        return dto;
    }

    public PageableDto findAllCars(String brandId, String modelId, String year, String page) {
        if (brandId.equals("") && modelId.equals("") && year.equals("")) {
            int convertedPage = parseStringAsInteger(page);

            return createPageableDto(carRepository.findAllCars(PageRequest.of(convertedPage, PAGE_SIZE)));
        } else if (!brandId.equals("") && modelId.equals("") && year.equals("")) {
            long convertedBrand = parseStringAsLong(brandId);
            int convertedPage = parseStringAsInteger(page);

            return createPageableDto(carRepository.findAllCarsByBrand(convertedBrand, PageRequest.of(convertedPage, PAGE_SIZE)));
        } else if (!brandId.equals("") && !modelId.equals("") && year.equals("")) {
            long convertedBrand = parseStringAsLong(brandId);
            long convertedModel = parseStringAsLong(modelId);
            int convertedPage = parseStringAsInteger(page);

            return createPageableDto(carRepository.findAllCarsByModel(convertedBrand, convertedModel, PageRequest.of(convertedPage, PAGE_SIZE)));
        } else if (!brandId.equals("") && !modelId.equals("") && !year.equals("")) {
            long convertedBrand = parseStringAsLong(brandId);
            long convertedModel = parseStringAsLong(modelId);
            long convertedYear = parseStringAsLong(year);
            int convertedPage = parseStringAsInteger(page);

            return createPageableDto(carRepository.findCarByYear(convertedBrand, convertedModel, convertedYear, PageRequest.of(convertedPage, PAGE_SIZE)));
        }

        return createEmptyPageableDto();
    }
}
