package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.InsuranceItemDto;
import com.synechron.backend_app.dtos.InsurancePlanDto;
import com.synechron.backend_app.dtos.ProposalDto;
import com.synechron.backend_app.dtos.pageable.PageableDto;
import com.synechron.backend_app.dtos.request.*;
import com.synechron.backend_app.enums.ProposalStatus;
import com.synechron.backend_app.exceptions.*;
import com.synechron.backend_app.mail.EmailService;
import com.synechron.backend_app.mapper.ProposalMapper;
import com.synechron.backend_app.models.*;
import com.synechron.backend_app.repositories.*;
import com.synechron.backend_app.models.Proposal;
import com.synechron.backend_app.models.Subscriber;
import com.synechron.backend_app.repositories.ProposalRepository;
import com.synechron.backend_app.repositories.SubscriberRepository;
import com.synechron.backend_app.utils.ProposalCar;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import lombok.ToString;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.time.LocalDateTime;
import java.util.*;

@ToString
@Service
public class ProposalService {
    private static int PAGE_SIZE = 10;
    private ProposalRepository proposalRepository;
    private ProposalMapper proposalMapper;
    private SubscriberRoleRepository subscriberRoleRepository;
    private SubscriberRepository subscriberRepository;
    private ContactRepository contactRepository;
    private AddressRepository addressRepository;
    private CarRepository carRepository;
    private final DriverRepository driverRepository;
    private final RiskRepository riskRepository;
    private InsurancePlanRepository insurancePlanRepository;
    private InsuranceItemRepository insuranceItemRepository;
    private FranchiseRepository franchiseRepository;
    private PaymentModeRepository paymentModeRepository;
    private CardTypeRepository cardTypeRepository;
    private CardPaymentRepository cardPaymentRepository;
    private PaymentRepository paymentRepository;
    private ChequePaymentRepository chequePaymentRepository;
    private BankPaymentRepository bankPaymentRepository;
    private EmailService emailService;

    public ProposalService(ProposalRepository proposalRepository,
                           ProposalMapper proposalMapper,
                           SubscriberRoleRepository subscriberRoleRepository,
                           SubscriberRepository subscriberRepository,
                           ContactRepository contactRepository,
                           AddressRepository addressRepository,
                           CarRepository carRepository,
                           DriverRepository driverRepository,
                           RiskRepository riskRepository,
                           InsurancePlanRepository insurancePlanRepository,
                           InsuranceItemRepository insuranceItemRepository,
                           FranchiseRepository franchiseRepository,
                           PaymentModeRepository paymentModeRepository,
                           CardTypeRepository cardTypeRepository,
                           CardPaymentRepository cardPaymentRepository,
                           PaymentRepository paymentRepository,
                           ChequePaymentRepository chequePaymentRepository,
                           BankPaymentRepository bankPaymentRepository,
                           EmailService emailService) {
        this.proposalRepository = proposalRepository;
        this.proposalMapper = proposalMapper;
        this.subscriberRoleRepository = subscriberRoleRepository;
        this.subscriberRepository = subscriberRepository;
        this.contactRepository = contactRepository;
        this.addressRepository = addressRepository;
        this.carRepository = carRepository;
        this.driverRepository = driverRepository;
        this.riskRepository = riskRepository;
        this.insurancePlanRepository = insurancePlanRepository;
        this.insuranceItemRepository = insuranceItemRepository;
        this.franchiseRepository = franchiseRepository;
        this.paymentModeRepository = paymentModeRepository;
        this.cardTypeRepository = cardTypeRepository;
        this.cardPaymentRepository = cardPaymentRepository;
        this.paymentRepository = paymentRepository;
        this.chequePaymentRepository = chequePaymentRepository;
        this.bankPaymentRepository = bankPaymentRepository;
        this.emailService = emailService;
    }

    public PageableDto findAllProposals(int page) {
        Page<Proposal> proposalsPage = proposalRepository.findAllWhichAreNotDeleted(PageRequest.of(page, PAGE_SIZE));
        PageableDto proposals = new PageableDto();

        proposalsPage.forEach(proposal -> {
            proposals.getObjects().add(proposalMapper.fromEntityToDto(proposal));
        });

        proposals.setHasNext(proposalsPage.hasNext());
        proposals.setHasPrevious(proposalsPage.hasPrevious());
        proposals.setSliceNumber(proposalsPage.getNumber());
        proposals.setTotalElements(proposalsPage.getTotalElements());
        proposals.setTotalNumberOfPages(proposalsPage.getTotalPages());

        return proposals;
    }

    public ProposalDto addSubscriberToProposal(Long subscriberId, Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        Subscriber subscriber = subscriberRepository.findById(subscriberId)
                .orElseThrow(() -> new ResourceNotFoundException("Subscriber with id " + subscriberId + " not found!"));

        proposal.setSubscriber(subscriber);
        proposal.setProposalStatus(ProposalStatus.SUBSCRIBER_ADDED);
        proposalRepository.save(proposal);

        return proposalMapper.fromEntityToDto(proposal);
    }

    public ProposalDto findProposalById(Long id) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + id + " not found!"));

        return proposalMapper.fromEntityToDto(proposal);
    }

    public ProposalDto initializeNewProposal() {
        Proposal proposal = Proposal.builder()
                .proposalStatus(ProposalStatus.INITIALIZED)
                .creationDate(LocalDateTime.now())
                .isDeleted(false)
                .build();

        try {
            Proposal newProposal = proposalRepository.save(proposal);
            return proposalMapper.fromEntityToDto(newProposal);
        } catch (Exception e) {
            e.printStackTrace();
            throw new FailedInitializingNewProposal("Creation of new proposal failed!");
        }
    }

    @Transactional
    public ProposalDto createNewSubscriberAndAddToProposal(Long proposalId, NewSubscriberDto subscriberData) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        SubscriberRole subscriberRole = subscriberRoleRepository.findByName(subscriberData.getSubscriberRole())
                .orElseThrow(() -> new ResourceNotFoundException("Subscriber role with name " + subscriberData.getSubscriberRole() + " not found!"));

        if (contactRepository.findByEmail(subscriberData.getEmail()).isPresent())
            throw new NotUniqueException("Contact with email " + subscriberData.getEmail() + " already exists!");
        if (contactRepository.findByMobilePhone(subscriberData.getMobilePhone()).isPresent())
            throw new NotUniqueException("Contact with mobile phone " + subscriberData.getMobilePhone() + " already exists!");
        if (subscriberRepository.findOneByJmbg(subscriberData.getJmbg()).isPresent())
            throw new NotUniqueException("Subscriber with jmbg " + subscriberData.getJmbg() + " already exists!");

        Address address = addressRepository.findById(subscriberData.getAddressId())
                .orElseThrow(() -> new ResourceNotFoundException("Address with id " + subscriberData.getAddressId() + " not found!"));

        Contact contact = new Contact();
        contact.setEmail(subscriberData.getEmail());
        contact.setHomePhone(subscriberData.getHomePhone());
        contact.setMobilePhone(subscriberData.getMobilePhone());

        Subscriber subscriber = new Subscriber();
        subscriber.setSubscriberRole(subscriberRole);
        subscriber.setFirstName(subscriberData.getFirstName());
        subscriber.setLastName(subscriberData.getLastName());
        subscriber.setJmbg(subscriberData.getJmbg());
        subscriber.setBirth(subscriberData.getBirth());
        subscriber.setContact(contact);
        subscriber.setAddress(address);

        subscriberRepository.save(subscriber);
        proposal.setSubscriber(subscriber);
        proposal.setProposalStatus(ProposalStatus.SUBSCRIBER_ADDED);
        return proposalMapper.fromEntityToDto(proposalRepository.save(proposal));
    }

    public ProposalDto addCarToProposal(Long proposalId, ProposalCar proposalCar) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        Car car = carRepository.findById(proposalCar.getCar().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Car with id " + proposalCar.getCar().getId() + " not found!"));

        proposal.setLicenceNum(proposalCar.getLicenceNum());
        proposal.setCar(car);
        proposal.setProposalStatus(ProposalStatus.CAR_ADDED);

        proposalRepository.save(proposal);
        return proposalMapper.fromEntityToDto(proposal);
    }

    public ProposalDto confirmProposal(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        if (proposal.getSubscriber() == null || proposal.getCar() == null
             || proposal.getDrivers() == null || proposal.getInsurancePlan() == null) {

            throw new CustomizableBadRequestException("Proposal is missing data to be confirmed!" +
                                                      " (Subscriber, car, drivers and insurance plan must be added" +
                                                      " to proposal)");
        } else {
            proposal.setProposalStatus(ProposalStatus.CONFIRMED);
            proposalRepository.save(proposal);
        }
        return proposalMapper.fromEntityToDto(proposal);
    }

    public ProposalDto payProposal(Long proposalId, PaymentRequestDto paymentRequestDto) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        Payment payment;

        if (paymentRequestDto.getCardNumber() != null) {
            payment = new Payment();
            payment.setPaymentMode(paymentModeRepository.findPaymentModeByName("card"));

            CardPayment cardPayment = new CardPayment();
            cardPayment.setCardHolder(paymentRequestDto.getPayer());
            cardPayment.setCardNumber(paymentRequestDto.getCardNumber());
            cardPayment.setCardType(cardTypeRepository.findCardTypeByName(paymentRequestDto.getCardType()));
            cardPaymentRepository.save(cardPayment);

            payment.setCardPayment(cardPayment);
            payment.setPaymentDate(paymentRequestDto.getPaymentDate());
            paymentRepository.save(payment);
        }

        if (paymentRequestDto.getChequeNumber() != null) {
            payment = new Payment();
            payment.setPaymentMode(paymentModeRepository.findPaymentModeByName("cheque"));

            ChequePayment chequePayment = new ChequePayment();
            chequePayment.setChequeDate(paymentRequestDto.getPaymentDate());
            chequePayment.setChequeNo(paymentRequestDto.getChequeNumber());
            chequePaymentRepository.save(chequePayment);

            payment.setChequePayment(chequePayment);
            payment.setPaymentDate(paymentRequestDto.getPaymentDate());
            paymentRepository.save(payment);
        }

        if (paymentRequestDto.getBankName() != null) {
            payment = new Payment();
            payment.setPaymentMode(paymentModeRepository.findPaymentModeByName("bank"));

            BankPayment bankPayment = new BankPayment();
            bankPayment.setBankName(paymentRequestDto.getBankName());
            Random random = new Random();
            int randomNum = random.nextInt(1000000);
            bankPayment.setTransactionNo(Integer.toString(randomNum));
            bankPaymentRepository.save(bankPayment);

            payment.setBankPayment(bankPayment);
            payment.setPaymentDate(paymentRequestDto.getPaymentDate());
            paymentRepository.save(payment);
        }

        proposal.setProposalStatus(ProposalStatus.PAID);
        proposalRepository.save(proposal);

        return proposalMapper.fromEntityToDto(proposal);
    }

    @Transactional
    public ProposalDto addDriversToProposal(Long proposalId, AddDriversToProposalDto dto) {
        if (dto.getNewDrivers().size() + dto.getExistingDrivers().size() + (dto.getSubscriber() != null ? 1 : 0) > 4) {
            throw new CustomizableBadRequestException("You can't add more than 4 drivers to the proposal!");
        }

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        proposal.setDrivers(new ArrayList<>());

        List<Driver> driversToBeAddedToProposal = new ArrayList<>();

        if (dto.getSubscriber() != null) {
            Subscriber subscriber = subscriberRepository.findById(dto.getSubscriber().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subscriber with id " + dto.getSubscriber().getId() + " not found!"));

            Optional<Driver> driverOptional = driverRepository.findByJmbg(subscriber.getJmbg());

            if (driverOptional.isPresent()) {
                Driver driver = driverOptional.get();

                addRisksToDriver(driver, dto.getSubscriber().getRisksIds());
                addAccidentHistoriesToDriver(driver, dto.getSubscriber().getAccidentHistories());

                driverRepository.save(driver);
                driversToBeAddedToProposal.add(driver);
            } else {
                Driver driver = new Driver(
                        subscriber.getFirstName(),
                        subscriber.getLastName(),
                        subscriber.getJmbg(),
                        subscriber.getBirth(),
                        subscriber.getAddress(),
                        subscriber.getContact(),
                        dto.getSubscriber().getLicenceNum(),
                        dto.getSubscriber().getLicenceObtained()
                );

                addRisksToDriver(driver, dto.getSubscriber().getRisksIds());
                addAccidentHistoriesToDriver(driver, dto.getSubscriber().getAccidentHistories());

                driverRepository.save(driver);
                driversToBeAddedToProposal.add(driver);
            }
        }

        for (ExistingDriverDto existingDriverDto : dto.getExistingDrivers()) {
            Driver driver = driverRepository.findById(existingDriverDto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Driver with id " + existingDriverDto.getId() + " not found!"));

            addRisksToDriver(driver, existingDriverDto.getRisksIds());
            addAccidentHistoriesToDriver(driver, existingDriverDto.getAccidentHistories());

            driverRepository.save(driver);
            driversToBeAddedToProposal.add(driver);
        }

        for (NewDriverDto newDriverDto : dto.getNewDrivers()) {
            if (driverRepository.findByJmbg(newDriverDto.getJmbg()).isPresent())
                throw new CustomizableBadRequestException("Driver with jmbg " + newDriverDto.getJmbg() + " already exists!");

            Address address = addressRepository.findById(newDriverDto.getAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Address with id " + newDriverDto.getAddressId() + " not found!"));

            if (contactRepository.findByMobilePhone(newDriverDto.getMobilePhone()).isPresent())
                throw new CustomizableBadRequestException("Driver with mobile phone " + newDriverDto.getMobilePhone() + " already exists!");

            if (contactRepository.findByEmail(newDriverDto.getEmail()).isPresent())
                throw new CustomizableBadRequestException("Driver with memail " + newDriverDto.getEmail() + " already exists!");

            Contact contact = Contact.builder()
                    .email(newDriverDto.getEmail())
                    .homePhone(newDriverDto.getHomePhone())
                    .mobilePhone(newDriverDto.getMobilePhone())
                    .build();

            Driver driver = new Driver(
                    newDriverDto.getFirstName(),
                    newDriverDto.getLastName(),
                    newDriverDto.getJmbg(),
                    newDriverDto.getBirth(),
                    address,
                    contact,
                    newDriverDto.getLicenceNum(),
                    newDriverDto.getLicenceObtained()
            );

            addRisksToDriver(driver, newDriverDto.getRisksIds());
            addAccidentHistoriesToDriver(driver, newDriverDto.getAccidentHistories());

            driverRepository.save(driver);
            driversToBeAddedToProposal.add(driver);
        }

        proposal.getDrivers().addAll(driversToBeAddedToProposal);
        proposal.setProposalStatus(ProposalStatus.DRIVERS_ADDED);

        return proposalMapper.fromEntityToDto(proposalRepository.save(proposal));
    }

    @Transactional
    public ProposalDto addInsurancePlanToProposal(Long proposalId, InsurancePlanDto insurancePlanDto) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        InsurancePlan insurancePlan = insurancePlanRepository.findById(insurancePlanDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Insurance plan with id " + insurancePlanDto.getId() + " not found!"));

        List<Franchise> previousFranchises = franchiseRepository.findAllByProposal(proposal);
        franchiseRepository.deleteAll(previousFranchises);

        for (InsuranceItemDto itemDto : insurancePlanDto.getInsuranceItems()) {
            InsuranceItem item = insuranceItemRepository.findById(itemDto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Insurance item with id " + itemDto.getId() + " not found!"));

            if (!insurancePlan.getInsuranceItems().contains(item))
                throw new CustomizableBadRequestException("Insurance plan does not contain one or more insurance items you've entered!");

            if (itemDto.getFranchisePercentage() < item.getFranchisePercentage())
                throw new CustomizableBadRequestException("Insurance item " + itemDto.getName() + ": franchise percentage cannot be lower than " + item.getFranchisePercentage() + "!");

            Franchise newFranchise = Franchise.builder()
                    .insuranceItem(item)
                    .proposal(proposal)
                    .percentage(itemDto.getFranchisePercentage())
                    .isDeleted(false)
                    .build();

            item.getFranchises().add(newFranchise);
            insuranceItemRepository.save(item);
        }

        proposal.calculateAmount();
        proposal.setInsurancePlan(insurancePlan);
        proposal.setProposalStatus(ProposalStatus.INSURANCE_PLAN_ADDED);

        return proposalMapper.fromEntityToDto(proposalRepository.save(proposal));
    }

    public byte[] exportReport(Long proposalId) {
        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal with id " + proposalId + " not found!"));

        if (!(proposal.getProposalStatus().equals(ProposalStatus.CONFIRMED) || proposal.getProposalStatus().equals(ProposalStatus.PAID)))
            throw new CustomizableBadRequestException("Proposal must be paid or confirmed to generate report!");

        try {
            List<Proposal> proposalList = new ArrayList<>();
            proposalList.add(proposal);

            File file = ResourceUtils.getFile("classpath:proposal_report.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(proposalList);
            JRBeanCollectionDataSource driversList = new JRBeanCollectionDataSource(proposal.getDrivers());
            JRBeanCollectionDataSource franchisesList = new JRBeanCollectionDataSource(proposal.getFranchises());

            Map<String, Object> parameters = new HashMap<>();
            parameters.put("CollectionOfDrivers", driversList);
            parameters.put("CollectionOfFranchises", franchisesList);

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            byte[] bytes = JasperExportManager.exportReportToPdf(jasperPrint);

            String fileName = "Report_" + proposal.getSubscriber().getFirstName() + proposal.getSubscriber().getLastName() + "_" + proposal.getId() + ".pdf";
            File attachment = new File(System.getProperty("user.dir") + "\\src\\main\\resources\\" + fileName);

            FileOutputStream outputStream = new FileOutputStream(attachment);
            outputStream.write(bytes);
            emailService.send(proposal.getSubscriber().getContact().getEmail(), "Generated report: " + fileName, "", attachment, fileName);

            return Base64.getEncoder().encode(bytes);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomizableInternalServerErrorException(e.getMessage());
        }
    }

    // region Helper methods

    public void addRisksToDriver(Driver driver, List<Long> riskIds) {
        for (Long riskId : riskIds) {
            Risk risk = riskRepository.findById(riskId)
                    .orElseThrow(() -> new ResourceNotFoundException("Risk with id " + riskId + " not found!"));

            if (!driver.getRisks().contains(risk))
                driver.getRisks().add(risk);
        }
    }

    public void addAccidentHistoriesToDriver(Driver driver, List<NewAccidentHistoryDto> newAccidentHistoriesDto) {
        for (NewAccidentHistoryDto accidentHistoryDto : newAccidentHistoriesDto) {
            AccidentHistory accident = new AccidentHistory();
            accident.setDriver(driver);
            accident.setDescription(accidentHistoryDto.getDescription());
            accident.setWasResponsible(accidentHistoryDto.getWasResponsible());
            accident.setTimeHappened(accidentHistoryDto.getTimeHappened());

            driver.getAccidentHistories().add(accident);
        }
    }

    // endregion
}


